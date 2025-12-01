import React, { Suspense } from "react"

export const withSuspense = <WCP extends {}>(WrappedComponent: React.ComponentType<WCP>) => {
    return (props: WCP) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <WrappedComponent {...props} />
            </Suspense>
        )
    }
}