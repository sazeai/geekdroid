'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  className?: string
}

export function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    // Wait for the container to have a width
    if (!adRef.current || adRef.current.offsetWidth === 0) {
      const observer = new ResizeObserver((entries) => {
        const [entry] = entries
        if (entry.contentRect.width > 0 && !isLoaded.current) {
          loadAd()
        }
      })

      observer.observe(adRef.current!)
      return () => observer.disconnect()
    } else if (!isLoaded.current) {
      loadAd()
    }
  }, [slot, format])

  const loadAd = () => {
    if (!adRef.current || isLoaded.current) return

    // Clean up previous ad if it exists
    const currentAd = adRef.current.querySelector('ins.adsbygoogle')
    if (currentAd) {
      currentAd.remove()
    }

    try {
      const adsbygoogle = (window as any).adsbygoogle
      if (adsbygoogle) {
        // Create new ad element
        const adElement = document.createElement('ins')
        adElement.className = 'adsbygoogle'
        adElement.style.display = 'block'
        adElement.dataset.adClient = process.env.NEXT_PUBLIC_ADSENSE_ID
        adElement.dataset.adSlot = slot
        
        // Set appropriate size based on format
        if (format === 'rectangle') {
          adElement.style.width = '300px'
          adElement.style.height = '250px'
          adElement.dataset.adFormat = 'rectangle'
        } else {
          adElement.style.width = '100%'
          adElement.style.height = 'auto'
          adElement.dataset.adFormat = format
          adElement.dataset.fullWidthResponsive = 'true'
        }

        // Append new ad element
        adRef.current.appendChild(adElement)

        // Push the ad
        adsbygoogle.push({})
        isLoaded.current = true
      }
    } catch (err) {
      console.error('Ad loading error:', err)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (adRef.current) {
        const currentAd = adRef.current.querySelector('ins.adsbygoogle')
        if (currentAd) {
          currentAd.remove()
        }
      }
      isLoaded.current = false
    }
  }, [])

  return (
    <div 
      ref={adRef} 
      className={`min-h-[100px] ${format === 'rectangle' ? 'w-[300px] h-[250px]' : 'w-full'} ${className}`}
    />
  )
}