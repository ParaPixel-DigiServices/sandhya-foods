"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { v4 as uuid } from "uuid"

export default function AdminProducts() {
  const [products,setProducts] = useState<any[]>([])
  const [open,setOpen] = useState(false)
  const [edit,setEdit] = useState<any>(null)
  const [form,setForm] = useState<any>({
    name:"",
    description:"",
    ingredients:"",
    price:"",
    mrp:"",
    active:true,
    is_bestseller:false,
    image:null
  })

  async function load(){
    const { data } = await supabase
      .from("products")
      .select("*, product_images(url,is_primary)")
      .order("created_at",{ascending:false})
    setProducts(data||[])
  }

  useEffect(()=>{ load() },[])

  async function save(){
    let productId = edit?.id

    const payload = {
      name:form.name,
      slug:form.name.toLowerCase().replace(/\s+/g,"-"),
      description:form.description,
      ingredients:form.ingredients,
      price:form.price,
      mrp:form.mrp,
      active:form.active,
      is_bestseller:form.is_bestseller
    }

    if(edit){
      await supabase.from("products").update(payload).eq("id",edit.id)
    } else {
      const { data } = await supabase.from("products").insert(payload).select().single()
      productId = data.id
    }

    if(form.image){
      const path = `products/${uuid()}`
      const { data } = await supabase.storage.from("product-images").upload(path, form.image, { upsert:true })
      const url = supabase.storage.from("product-images").getPublicUrl(data!.path).data.publicUrl

      await supabase.from("product_images").update({ is_primary:false }).eq("product_id",productId)

      await supabase.from("product_images").insert({
        product_id: productId,
        url,
        is_primary: true
      })
    }

    setOpen(false)
    setEdit(null)
    setForm({
      name:"",
      description:"",
      ingredients:"",
      price:"",
      mrp:"",
      active:true,
      is_bestseller:false,
      image:null
    })
    load()
  }

  async function remove(id:string){
    if(confirm("Delete this product?")){
      await supabase.from("products").delete().eq("id",id)
      load()
    }
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#7a1a14]">Products</h1>
        <button onClick={()=>setOpen(true)}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89b2d] text-black font-semibold">
          Create Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p=>(
          <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img src={p.product_images?.find((i:any)=>i.is_primary)?.url} className="w-full h-44 object-cover"/>
            <div className="p-4 space-y-2">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{p.description}</div>
              <div className="font-bold text-[#7a1a14]">₹ {p.price}</div>
              <div className="flex gap-3 pt-3">
                <button onClick={()=>{
                    setEdit(p)
                    setForm({
                      name:p.name||"",
                      description:p.description||"",
                      ingredients:p.ingredients||"",
                      price:p.price||"",
                      mrp:p.mrp||"",
                      active:p.active,
                      is_bestseller:p.is_bestseller,
                      image:null
                    })
                    setOpen(true)
                  }}
                  className="flex-1 border border-gray-300 rounded-full py-2 hover:bg-gray-100">
                  Edit
                </button>
                <button onClick={()=>remove(p.id)}
                  className="flex-1 bg-[#7a1a14] text-white rounded-full py-2 hover:opacity-90">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 grid place-items-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-5">

            <h2 className="text-lg font-semibold text-[#7a1a14]">
              {edit ? "Edit Product" : "Create Product"}
            </h2>

            <div className="space-y-3">
              <input placeholder="Product Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>

              <textarea placeholder="Description"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 h-20"
                value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>

              <textarea placeholder="Ingredients"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 h-16"
                value={form.ingredients} onChange={e=>setForm({...form,ingredients:e.target.value})}/>

              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Selling Price"
                  className="border border-gray-300 rounded-xl px-4 py-3"
                  value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
                <input placeholder="MRP"
                  className="border border-gray-300 rounded-xl px-4 py-3"
                  value={form.mrp} onChange={e=>setForm({...form,mrp:e.target.value})}/>
              </div>

              <label className="block">
                <div className="w-full border-2 border-dashed border-[#7a1a14] rounded-xl p-5 text-center cursor-pointer hover:bg-[#fdf4f2] transition">
                  <p className="text-sm text-[#7a1a14]">Click to upload product image</p>
                  {form.image && <p className="text-xs mt-1 opacity-60">{form.image.name}</p>}
                </div>
                <input type="file" accept="image/*" hidden
                  onChange={e=>setForm({...form,image:e.target.files![0]})}/>
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={form.active}
                  onChange={e=>setForm({...form,active:e.target.checked})}/> Active
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={form.is_bestseller}
                  onChange={e=>setForm({...form,is_bestseller:e.target.checked})}/> Bestseller
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={save}
                className="flex-1 bg-[#7a1a14] text-white py-3 rounded-full">
                {edit ? "Update Product" : "Save Product"}
              </button>
              <button onClick={()=>{setOpen(false); setEdit(null)}}
                className="flex-1 border rounded-full py-3">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
