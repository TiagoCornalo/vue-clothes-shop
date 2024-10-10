<template>
  <div class="sidebar-container">
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <Menu class="menu-icon text-[#3b3a3a]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader class="flex justify-between items-center">
          <img
            src="https://res.cloudinary.com/dopgj4dbg/image/upload/v1720996579/beeb5ry9xjekbxovjwz4.png"
            loading="lazy"
          />
        </SheetHeader>
        <Accordion
          type="single"
          collapsible
          class="accordion-container"
        >
          <AccordionItem
            v-for="(item) in accordionItems"
            :key="item.title"
            :value="item.title"
          >
            <AccordionTrigger>
              <span class="accordion-item-trigger">
                {{ item.title }}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li
                  v-for="(content, index) in item.content"
                  :key="index"
                  class="accordion-item-link"
                >
                  <RouterLink :to="generateLink(item.title, content)">
                    {{ content }}
                  </RouterLink>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Button,
} from '@/ui'
import { RouterLink } from 'vue-router';
import { Menu } from 'lucide-vue-next'

const accordionItems = [
  {
    title: 'MUJER',
    content: ['Abrigos', 'Pantalones', 'Remeras', 'Camisas', 'Vestidos', 'Polleras', 'Blazers', 'Sweaters', 'Acesorios', 'Perfumes']
  },
  {
    title: 'HOMBRE',
    content: ['Abrigos', 'Pantalones', 'Remeras', 'Camisas', 'Buzos', 'Jeans', 'Bermudas', 'Polos', 'Acesorios', 'Perfumes']
  }
]

const generateLink = (category: string, item: string) => {
  return `/${category.toLowerCase()}/${item.toLowerCase()}`;
}
</script>

<style scoped lang="scss">
.sidebar-container {
  position: fixed;
  padding: 2rem 0 0 2rem;
  top: 0;
  left: 0;
  z-index: 50;
}

.menu-icon {
  color: #3b3a3a;
}

.accordion-container {
  width: 100%;
  padding-top: 1rem;
  gap: 1rem;
}

.accordion-item-trigger {
  font-size: 1.5rem;
  line-height: 1.5rem;
  letter-spacing: 0.25rem;
  color: #201f1f;
  font-weight: bold;
}

.accordion-item-link {
  font-size: 1rem;
  line-height: 1rem;
  margin: 1rem 0;
}

.accordion-item-link:hover {
  font-weight: bold;
  text-decoration: underline;
}
</style>
