import dynamic from 'next/dynamic';
import React from 'react'
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const page = () => {
  return (
    <div>
      <Map />
    </div>
  )
}

export default page;