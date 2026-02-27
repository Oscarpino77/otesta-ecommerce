import { useState } from 'react'
import { ChevronDown, Sliders } from 'lucide-react'
import { CATEGORY_LABELS, SIZES } from '@/lib/utils'

interface CategoryMenuProps {
  onApplyFilters: (filters: {
    category?: string
    priceMin?: number
    priceMax?: number
    sizes?: string[]
  }) => void
  expanded?: boolean
}

export default function CategoryMenu({ onApplyFilters, expanded = false }: CategoryMenuProps) {
  const [isOpen, setIsOpen] = useState(expanded)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const categories = ['suits', 'outerwear', 'accessories', 'shirts', 'trousers']

  const handleApplyFilters = (category?: string) => {
    onApplyFilters({
      category,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
    })
    if (!expanded) setIsOpen(false)
  }

  const handleResetFilters = () => {
    setPriceRange([0, 5000])
    setSelectedSizes([])
    onApplyFilters({})
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  if (expanded) {
    return (
      <div className="w-full bg-white border border-border rounded-lg p-6">
        {/* All Products */}
        <button
          onClick={() => handleApplyFilters()}
          className="w-full text-left py-2 text-sm hover:text-accent transition font-600"
        >
          Tutti i Prodotti
        </button>

        {/* Categories */}
        <div className="my-4 space-y-2 border-y border-border py-4">
          <h3 className="text-sm font-600 mb-3">Categorie</h3>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleApplyFilters(cat)}
              className="w-full text-left text-sm py-1 hover:text-accent transition"
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Price Slider */}
        <div className="my-4 border-y border-border py-4">
          <label className="text-sm font-600 block mb-3">Prezzo</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full mt-2"
          />
          <div className="text-xs text-text-muted mt-2">
            €{priceRange[0]} - €{priceRange[1]}
          </div>
        </div>

        {/* Sizes */}
        <div className="my-4 border-y border-border py-4">
          <label className="text-sm font-600 block mb-3">Taglie</label>
          <div className="grid grid-cols-2 gap-2">
            {SIZES.map((size: string) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="mr-2"
                />
                <span className="text-sm">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 mt-4">
          <button
            onClick={() => handleApplyFilters()}
            className="w-full bg-primary text-white py-2 rounded text-sm hover:opacity-90 transition"
          >
            Applica Filtri
          </button>
          <button
            onClick={handleResetFilters}
            className="w-full border border-border py-2 rounded text-sm hover:bg-background-alt transition"
          >
            Reset Filtri
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-serif text-lg text-accent hover:opacity-80 transition"
      >
        Uomo
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-lg shadow-lg p-6 z-50">
          {/* All Products */}
          <button
            onClick={() => handleApplyFilters()}
            className="w-full text-left py-2 text-sm hover:text-accent transition"
          >
            Tutti i Prodotti
          </button>

          {/* Categories */}
          <div className="my-4 space-y-2 border-y border-border py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleApplyFilters(cat)}
                className="w-full text-left text-sm py-1 hover:text-accent transition"
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Price Slider */}
          <div className="my-4 border-y border-border py-4">
            <label className="text-sm font-600 block mb-3">Prezzo</label>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full mt-2"
            />
            <div className="text-xs text-text-muted mt-2">
              €{priceRange[0]} - €{priceRange[1]}
            </div>
          </div>

          {/* Sizes */}
          <div className="my-4 border-y border-border py-4">
            <label className="text-sm font-600 block mb-3">Taglie</label>
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map((size: string) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="mr-2"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2 mt-4">
            <button
              onClick={() => handleApplyFilters()}
              className="w-full bg-primary text-white py-2 rounded text-sm hover:opacity-90 transition"
            >
              Applica Filtri
            </button>
            <button
              onClick={handleResetFilters}
              className="w-full border border-border py-2 rounded text-sm hover:bg-background-alt transition"
            >
              Reset Filtri
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
