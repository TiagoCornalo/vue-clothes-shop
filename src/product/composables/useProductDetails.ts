import { ref, computed } from 'vue'
import { useShoppingBagStore } from '@/store'
import { useToast } from '@/ui'
import type { Product } from '@/types'

export function useProductDetails(initialProduct: Product) {
  const product = ref<Product>()
  const isLoading = ref(true)
  const selectedSize = ref('')
  const selectedColor = ref(product.value.colors[0].name)
  const shoppingBagStore = useShoppingBagStore()
  const { toast } = useToast()

  const availableSizes = computed(() => {
    return product.value.colors.find(color => color.name === selectedColor.value)?.sizes.filter(size => size.quantity > 0) || []
  })

  const updateStock = (color: string, size: string) => {
    const colorIndex = product.value.colors.findIndex(c => c.name === color)
    if (colorIndex !== -1) {
      const sizeIndex = product.value.colors[colorIndex].sizes.findIndex(s => s.size === size)
      if (sizeIndex !== -1) {
        product.value.colors[colorIndex].sizes[sizeIndex].quantity--
      }
    }
  }

  const addToCart = () => {
    if (!selectedSize.value) {
      toast({
        title: "Tamaño no seleccionado",
        description: "Por favor, selecciona un tamaño antes de agregar a la cesta",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const selectedColorObj = product.value.colors.find(color => color.name === selectedColor.value)
    const selectedSizeObj = selectedColorObj?.sizes.find(size => size.size === selectedSize.value)

    if (!selectedSizeObj || selectedSizeObj.quantity === 0) {
      toast({
        title: "Tamaño no disponible",
        description: "Lo sentimos, el tamaño seleccionado no está disponible en este momento",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const existingItem = shoppingBagStore.items.find(item =>
      item.id === product.value.id &&
      item.size === selectedSize.value &&
      item.color === selectedColor.value
    )

    if (existingItem && existingItem.quantity >= selectedSizeObj.quantity) {
      toast({
        title: "Límite de stock alcanzado",
        description: "Ya has agregado la cantidad máxima disponible de este producto a tu carrito",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    shoppingBagStore.addItem({
      ...product.value,
      size: selectedSize.value,
      color: selectedColor.value,
      quantity: 1
    })
    updateStock(selectedColor.value, selectedSize.value)

    toast({
      title: "Producto agregado a la cesta",
      description: `Se ha agregado "${product.value.name}" a la cesta`,
      variant: "default",
      duration: 3000,
    })

    selectedSize.value = ""
  }

  const producto = (id: string) => {
    return {
      id: parseInt(id),
      name: "Camisa Rayada Azul",
      slug: "camisa-rayada-azul",
      price: 49.99,
      description: "Descripción del producto...",
      images: [
        "https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg",
        "https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg",
        "https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg"
      ],
      category: "camisas",
      gender: "hombre",
      tags: ["camisas", "hombre", "azul"],
      isNewArrival: true,
      isOnSale: false,
      salePrice: 39.99,
      colors: [
        {
          name: "Rojo",
          hex: "#E8A5A6",
          sizes: [
            {
              size: "S",
              quantity: 10
            },
            {
              size: "M",
              quantity: 10
            }
          ]
        },
        {
          name: "Azul",
          hex: "#A7C9D4",
          sizes: [
            {
              size: "S",
              quantity: 10
            }
          ]
        },
        {
          name: "Verde",
          hex: "#91EC99",
          sizes: [
            {
              size: "L",
              quantity: 10
            },
            {
              size: "XL",
              quantity: 10
            }
          ]
        }
      ],
      brand: "Nike",
      saved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  const fetchProduct = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      return producto(id)
    } catch (error) {
      console.error('Error al cargar el producto:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    product,
    isLoading,
    selectedSize,
    selectedColor,
    availableSizes,
    addToCart,
    updateStock,
    fetchProduct
  }
}