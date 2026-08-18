export default function formatDate(isoDate:string) {
    // const isoDate = "2025-10-14T13:22:46.497Z";
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });
    return formattedDate
}
