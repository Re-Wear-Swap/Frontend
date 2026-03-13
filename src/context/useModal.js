import { useState, useCallback } from 'react'

export const useModal = () => {
  const [modal, setModal] = useState({ isOpen: false })

  const showConfirm = useCallback((message, title) => {
    return new Promise((resolve) => {
      setModal({ isOpen: true, type: 'confirm', message, title,
        onConfirm: () => { setModal({ isOpen: false }); resolve(true) },
        onCancel:  () => { setModal({ isOpen: false }); resolve(false) },
      })
    })
  }, [])

  const showAlert = useCallback((message, title, type = 'alert') => {
    return new Promise((resolve) => {
      setModal({ isOpen: true, type, message, title,
        onConfirm: () => { setModal({ isOpen: false }); resolve() },
        onCancel:  () => { setModal({ isOpen: false }); resolve() },
      })
    })
  }, [])

  return { modal, showConfirm, showAlert }
}
