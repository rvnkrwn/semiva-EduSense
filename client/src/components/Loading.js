export default function Loading() {
  return(
      <div className="fixed h-screen w-screen bg-gray-500/40" style={{zIndex: 999999}}>
        <span className="loading loading-spinner loading-lg text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      </div>
  )
}