import React from 'react'

export default function SeacrhBar() {
  return (
    <div class="space-x-4">
      <input type="text" placeholder="Encuentra tu plato" class="border border-gray-300 px-4 py-2"></input>
      <button type="submit" className="bg-orange-600 w-16 h-6 text-white rounded-md font-bold self-end mt-4">Buscar</button>
    </div>
  )
}
