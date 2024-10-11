import { ref, computed, watch, onMounted } from 'vue'
import { useShoppingBagStore } from '@/store'
import { useToast } from '@/ui'
import type { Product, Size, ShoppingBagItem } from '@/types'

export function useProductDetails() {
  const product = ref<Product | null>(null)
  const isLoading = ref(true)
  const selectedSize = ref<string>('')
  const selectedColor = ref<string>('')
  const shoppingBagStore = useShoppingBagStore()
  const { toast } = useToast()

  const availableSizes = computed<Size[]>(() => {
    if (!product.value) return []
    const selectedColorObj = product.value.colors.find(
      (color) => color.name === selectedColor.value
    )
    return selectedColorObj?.sizes.filter((size) => size.quantity > 0) || []
  })

  const canAddToCart = computed(() => {
    if (!product.value || !selectedSize.value || !selectedColor.value) {
      return false
    }
    const totalAvailableStock = getAvailableStock(
      product.value,
      selectedColor.value,
      selectedSize.value
    )
    return totalAvailableStock > 0
  })

  const getAvailableStock = (
    product: Product,
    colorName: string,
    sizeName: string
  ) => {
    const selectedColorObj = product.colors.find(
      (color) => color.name === colorName
    )
    const sizeObj = selectedColorObj?.sizes.find(
      (size) => size.size === sizeName
    )
    if (!sizeObj) return 0

    const quantityInCart = shoppingBagStore.getItemQuantity(
      product.id,
      colorName,
      sizeName
    )

    return sizeObj.quantity - quantityInCart
  }

  const addToCart = () => {
    if (!product.value) {
      return
    }

    if (!selectedSize.value || !selectedColor.value) {
      toast({
        title: 'Selección incompleta',
        description:
          'Por favor, selecciona un tamaño y un color antes de agregar a la cesta',
        variant: 'destructive',
        duration: 3000
      })
      return
    }

    const availableStock = getAvailableStock(
      product.value,
      selectedColor.value,
      selectedSize.value
    )

    if (availableStock <= 0) {
      const quantityInCart = shoppingBagStore.getItemQuantity(
        product.value.id,
        selectedColor.value,
        selectedSize.value
      )
      const selectedColorObj = product.value.colors.find(
        (color) => color.name === selectedColor.value
      )
      const sizeObj = selectedColorObj?.sizes.find(
        (size) => size.size === selectedSize.value
      )
      const initialStock = sizeObj ? sizeObj.quantity : 0

      if (quantityInCart >= initialStock) {
        toast({
          title: 'Cantidad máxima alcanzada',
          description:
            'Ya has agregado la cantidad máxima disponible de este producto a tu cesta',
          variant: 'destructive',
          duration: 3000
        })
      } else {
        toast({
          title: 'Sin stock disponible',
          description:
            'Lo sentimos, no hay más stock disponible para esta combinación',
          variant: 'destructive',
          duration: 3000
        })
      }
      return
    }

    const newItem: ShoppingBagItem = {
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      size: selectedSize.value,
      color: selectedColor.value,
      quantity: 1,
      image: product.value.images[0],
      slug: product.value.slug,
      description: product.value.description,
      category: product.value.category
    }

    shoppingBagStore.addItem(newItem)

    toast({
      title: 'Producto agregado a la cesta',
      description: `Se ha agregado "${product.value.name}" a la cesta`,
      variant: 'default',
      duration: 3000
    })

    selectedSize.value = ''
  }

  const producto = (id: string) => {
    return {
      id: parseInt(id),
      name: 'Camisa Rayada Azul',
      slug: 'camisa-rayada-azul',
      price: 49.99,
      description: 'Descripción del producto...',
      images: [
        'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633764/sbzhziwixshygpburaip.jpg',
        'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/ko1l1vfxfshph1sfur31.jpg',
        'https://res.cloudinary.com/dopgj4dbg/image/upload/v1715633763/nuwx3wir2monecizznuv.jpg'
      ],
      category: 'camisas',
      gender: 'hombre',
      tags: ['camisas', 'hombre', 'azul'],
      isNewArrival: true,
      isOnSale: false,
      salePrice: 39.99,
      colors: [
        {
          name: 'Rojo',
          hex: '#E8A5A6',
          sizes: [
            {
              size: 'S',
              quantity: 10
            },
            {
              size: 'M',
              quantity: 10
            }
          ]
        },
        {
          name: 'Azul',
          hex: '#A7C9D4',
          sizes: [
            {
              size: 'S',
              quantity: 10
            }
          ]
        },
        {
          name: 'Verde',
          hex: '#91EC99',
          sizes: [
            {
              size: 'L',
              quantity: 10
            },
            {
              size: 'XL',
              quantity: 10
            }
          ]
        }
      ],
      brand: 'Nike',
      saved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  const fetchProduct = async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const fetchedProduct = producto(id)
      product.value = fetchedProduct
    } catch (error) {
      console.error('Error al cargar el producto:', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    shoppingBagStore.initializeStore()
  })

  watch(product, (newProduct) => {
    if (newProduct && newProduct.colors.length > 0) {
      selectedColor.value = newProduct.colors[0].name
      selectedSize.value = ''
    }
  })

  return {
    product,
    isLoading,
    selectedSize,
    selectedColor,
    availableSizes,
    canAddToCart,
    addToCart,
    fetchProduct
  }
}
