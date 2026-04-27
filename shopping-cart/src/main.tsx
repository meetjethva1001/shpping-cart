import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import {store} from './store/store.ts'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <App />
         </QueryClientProvider>
      </BrowserRouter>
   </Provider>
)
