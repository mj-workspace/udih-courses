import { createContext, useContext } from 'react'

const PopupBudgetContext = createContext(null)

export function PopupBudgetProvider({ module, children }) {
  return <PopupBudgetContext.Provider value={module}>{children}</PopupBudgetContext.Provider>
}

export function usePopupBudgetModule() {
  return useContext(PopupBudgetContext)
}
