
// config/index.tsx

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { cookieStorage, createStorage } from '@wagmi/core'

// Get projectId from https://cloud.reown.com
export const projectId = '62faed7803be99277d2f315c71e9de85'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig


