export default function () {
    const lowlight = TiptapcreateLowlight(Tiptapcommon);

    return [
        TiptapStarterKit.configure({
            codeBlock: false,
        }),
        TiptapCodeBlockLowlight.configure({
            lowlight,
        }),
    ];
}