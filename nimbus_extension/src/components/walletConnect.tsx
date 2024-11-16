export default function WalletConnect() {
    return (
        <div>
            <appkit-button
                balance={"hide"}
            />
            <appkit-network-button
                disabled={false}
            />
        </div>
    );
}
