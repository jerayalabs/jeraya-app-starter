import { useState, useEffect, useCallback } from 'preact/hooks'
import {
  ensureInventorySchema,
  loadInventoryAppData,
  createInventory,
  createProduct,
  createOrder,
  receiveStock,
} from '../services/inventory.service'
import type { InventoryTables } from '../types/jeraya'
import type {
  Inventory,
  InventoryAppData,
  InventoryForm,
  JerayaUser,
  Order,
  OrderForm,
  Product,
  ProductForm,
  StockRecord,
} from '../types/inventory'

interface UseInventoryReturn {
  loading: boolean
  saving: boolean
  error: string
  tables: InventoryTables | null
  profile: JerayaUser | null
  users: JerayaUser[]
  inventories: Inventory[]
  products: Product[]
  stock: StockRecord[]
  orders: Order[]
  refresh: () => Promise<void>
  addInventory: (form: InventoryForm) => Promise<void>
  addProduct: (form: ProductForm) => Promise<void>
  addOrder: (form: OrderForm, selectedProductId: string) => Promise<void>
}

export function useInventory(): UseInventoryReturn {
  const [tables, setTables] = useState<InventoryTables | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<InventoryAppData>({
    inventories: [],
    products: [],
    stock: [],
    orders: [],
    profile: null,
    users: [],
  })

  const refresh = useCallback(async () => {
    if (!tables) return
    const result = await loadInventoryAppData(tables)
    setData(result)
  }, [tables])

  useEffect(() => {
    let mounted = true

    async function boot() {
      try {
        setLoading(true)
        const readyTables = await ensureInventorySchema()
        if (!mounted) return
        setTables(readyTables)
        const result = await loadInventoryAppData(readyTables)
        if (!mounted) return
        setData(result)
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unable to prepare inventory workspace.')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    boot()
    return () => {
      mounted = false
    }
  }, [])

  const addInventory = useCallback(
    async (form: InventoryForm) => {
      if (!tables || !form.name.trim()) return
      setSaving(true)
      setError('')
      try {
        await createInventory(tables, form)
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to create inventory.')
      } finally {
        setSaving(false)
      }
    },
    [tables, refresh],
  )

  const addProduct = useCallback(
    async (form: ProductForm) => {
      if (!tables || !form.name.trim()) return
      setSaving(true)
      setError('')
      try {
        await createProduct(tables, form)
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to create product.')
      } finally {
        setSaving(false)
      }
    },
    [tables, refresh],
  )

  const addOrder = useCallback(
    async (form: OrderForm, selectedProductId: string) => {
      if (!tables || !form.inventoryId || !form.quantity) return

      const selectedProduct = data.products.find((p) => p.id === selectedProductId)
      const payload: OrderForm = {
        ...form,
        productId: selectedProduct?.id ?? '',
        productName: selectedProduct?.Name ?? form.productName,
      }

      setSaving(true)
      setError('')
      try {
        await createOrder(tables, payload, data.profile)
        if (payload.status === 'Received' && payload.productId) {
          await receiveStock(tables, payload, data.profile, data.stock)
        }
        await refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to create order.')
      } finally {
        setSaving(false)
      }
    },
    [tables, data.profile, data.products, data.stock, refresh],
  )

  return {
    loading,
    saving,
    error,
    tables,
    profile: data.profile,
    users: data.users,
    inventories: data.inventories,
    products: data.products,
    stock: data.stock,
    orders: data.orders,
    refresh,
    addInventory,
    addProduct,
    addOrder,
  }
}
