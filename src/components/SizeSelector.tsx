import { SIZES } from '@/lib/utils'

interface SizeSelectorProps {
  sizes: string[]
  selectedSize?: string
  onSizeChange: (size: string) => void
  stockBySize: Record<string, number>
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
  stockBySize,
}: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null

  return (
    <div className="mb-6">
      <label className="block text-sm font-600 mb-3">Scegli la taglia</label>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => {
          const stock = stockBySize[size] ?? 0
          const isOutOfStock = stock === 0
          const isSelected = selectedSize === size

          return (
            <button
              key={size}
              onClick={() => !isOutOfStock && onSizeChange(size)}
              disabled={isOutOfStock}
              className={`py-2 px-1 rounded text-sm font-600 transition ${
                isSelected
                  ? 'bg-primary text-white'
                  : isOutOfStock
                    ? 'bg-gray-100 text-gray-300 line-through cursor-not-allowed'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
