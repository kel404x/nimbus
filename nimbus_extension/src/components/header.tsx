"use client"

import { useEffect, useState } from "react";
import { Connector, useAccount, useConnect } from 'wagmi';



export default function Header() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoggedIn(!isConnected);
    }, [isConnected]);

    return (
        <section >

            <section >

                {isLoggedIn ? (
                    <section>
                        {connectors.map((connector: Connector) => (
                            <button
                                disabled={!connector.ready}
                                key={connector.id}
                                onClick={() => connect({ connector })}
                            >
                                CONNECT WALLET
                            </button>
                        ))}
                    </section>
                ) : (
                    <section>
                        {address ? address.slice(0, 8) : ""}
                    </section>
                )}
            </section>
        </section>
    );
}
