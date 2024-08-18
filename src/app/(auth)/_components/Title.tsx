import React from "react";

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className='text-xl font-semibold mb-5'>{ children }</div>
  )
}