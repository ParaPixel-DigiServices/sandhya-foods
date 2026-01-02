import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartItem = {
  id:string
  name:string
  price:number
  image:string
  qty:number
}

type CartState = {
  items:CartItem[]
  add:(item:CartItem)=>void
  remove:(id:string)=>void
  change:(id:string,qty:number)=>void
  clear:()=>void
}

export const useCart = create<CartState>()(
  persist(
    (set)=>({
      items:[],
      add:item=>set(state=>{
        const ex = state.items.find(i=>i.id===item.id)
        if(ex) return {
          items: state.items.map(i=>i.id===item.id?{...i,qty:i.qty+item.qty}:i)
        }
        return { items:[...state.items,item] }
      }),
      remove:id=>set(state=>({ items: state.items.filter(i=>i.id!==id) })),
      change:(id,qty)=>set(state=>({ items: state.items.map(i=>i.id===id?{...i,qty}:i) })),
      clear:()=>set({ items:[] })
    }),
    { name:"royal-cart" }
  )
)
