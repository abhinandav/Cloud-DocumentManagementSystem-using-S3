import React from 'react'

function FolderModal({isOpen,onClose,createFolder,newFolderName,setNewFolderName}) {
    if (!isOpen) return null;
    
    return (
      <div
        className="fixed inset-0 z-[999] grid w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        onClick={()=>{onClose();setNewFolderName('')}}
      >
        <div
          className="relative m-4 w-[36rem] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl px-12 py-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-4 text-2xl font-semibold text-blue-gray-900">
            <span>Add New Project</span>
            <button className="text-gray-500 hover:text-gray-700" onClick={()=>{onClose();setNewFolderName('')}}>
              &times;
            </button>
          </div>
  
          <form onSubmit={createFolder}>
            <div className="flex flex-col mb-6">
              <label className="mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter title here"
                name="title"
                className="p-3 border-2 focus:border-gray-400 border-gray-200 rounded-lg"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
  
            <div className="flex justify-end">
              <button
                className="mr-2 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30"
                onClick={()=>{onClose();setNewFolderName('')}}
                type="button"
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85]"
                type="submit"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>a
      </div>
    );
}

export default FolderModal