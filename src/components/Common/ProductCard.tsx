import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { Product } from '../../data/products'
import { useCart } from '../../contexts/CartContext'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            <button className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-gray-600 hover:text-pink-500 transition-colors" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
              {product.name}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
              <span className="text-sm text-gray-600 ml-1">(4.0)</span>
            </div>
            <span className="text-sm text-gray-500">{product.age_range}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">
                {product.stock_quantity} in stock
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center space-x-2 text-sm font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard