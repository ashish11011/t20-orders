import React, { Suspense } from 'react'
import TablesPageClient from './tablepageClient'

const page = () => {
    return (
        <div>
            <Suspense>
                <TablesPageClient />
            </Suspense>
        </div>
    )
}

export default page