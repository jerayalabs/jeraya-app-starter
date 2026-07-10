import { useMemo } from 'preact/hooks'
import { getStockFor, isLowStock } from '../services/inventory.service'
import type { Product, StockRecord, InventoryStockRow } from '../types/inventory'

export function useInventoryStockRows(
  activeInventoryId: string,
  products: Product[],
  stock: StockRecord[],
) {
  return useMemo<InventoryStockRow[]>(() => {
    return products.map((product) => {
      const quantity = getStockFor(activeInventoryId, product.id, stock)
      return { product, quantity, low: isLowStock(product, quantity) }
    })
  }, [activeInventoryId, products, stock])
}
