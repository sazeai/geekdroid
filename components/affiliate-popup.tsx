'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AdUnit } from '@/components/ads/ad-unit'

interface AffiliatePopupProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  affiliateLink: string
  toolName: string
}

export function AffiliatePopup({ 
  isOpen, 
  onOpenChange, 
  affiliateLink,
  toolName 
}: AffiliatePopupProps) {
  const [timeLeft, setTimeLeft] = useState(5)
  const [buttonEnabled, setButtonEnabled] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(5)
      setButtonEnabled(false)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setButtonEnabled(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const handleVisit = () => {
    window.open(affiliateLink, '_blank')
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Visit {toolName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <AdUnit 
              slot="popup-ad-slot" 
              format="rectangle"
              className="bg-muted/50"
            />
          </div>
          
          <div className="text-center space-y-4">
            {!buttonEnabled && (
              <p className="text-muted-foreground">
                You will be redirected in {timeLeft} seconds...
              </p>
            )}
            
            <Button
              onClick={handleVisit}
              disabled={!buttonEnabled}
              className="w-full"
            >
              {buttonEnabled ? 'Go to Website' : `Wait ${timeLeft}s`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}