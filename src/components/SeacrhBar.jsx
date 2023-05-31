import React from 'react'

export default function SeacrhBar() {
  return (
    <div class="space-x-4">
      <input type="text" placeholder="Encuentra tu plato" class="border border-gray-300 px-4 py-2"></input>
      <button type="submit" className="bg-orange-600 w-20 h-10 text-white rounded-xl font-bold mt-6">Buscar</button>
    </div>
  )
}
