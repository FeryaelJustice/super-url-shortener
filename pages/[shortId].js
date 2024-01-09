import { PrismaClient } from "@prisma/client"

export default function ShortIDPage() {
    return (
        <div>
            Short ID Redirect
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const client = new PrismaClient();
    const { shortId } = params;

    const data = await client.link.findUnique({
        where: { shortUrl: shortId }
    })

    if (!data) return { redirect: { destination: '/' } }

    return {
        redirect: { destination: data.url }
    }
}