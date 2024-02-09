export default async function (msg) {
    const notification = useCookie('notification');
    notification.value = msg;
}