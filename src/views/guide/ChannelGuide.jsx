import useTranslation from "@/utils/hooks/useTranslation.js";

const ChannelGuide = () => {
    const {t} = useTranslation()

    return (
        <div className="">
            {/*<div className="mb-10">*/}
            {/*    <h2 className="text-xl font-semibold mb-2">✅ Step 1: Create a Telegram Channel</h2>*/}
            {/*    <p className="text-gray-700 mb-4">*/}
            {/*        <em>If you don’t already have a Telegram channel:</em><br />*/}
            {/*        Open Telegram → Tap the menu ☰ → Select <strong>New Channel</strong>. Choose a name,*/}
            {/*        add a description, and make sure the channel is set to <strong>Private</strong>.*/}
            {/*    </p>*/}
            {/*   <div className={""}>*/}
            {/*   */}
            {/*   </div>*/}
            {/*</div>*/}

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-2">✅ {t('guide.connect_channel.step1')}</h2>
                <p className="text-gray-700 mb-4">
                    {t('Go to your channel → Tap the channel name → Open')}
                    <strong> Administrators</strong>.
                </p>
                <div className={"flex flex-col md:flex-row gap-4"}>
                <img
                    src="/img/guide/1.jpeg"
                    alt="Create Telegram Channel"
                    className="rounded-xl border shadow-md w-full max-w-[300px]"
                />
                <img
                    src="/img/guide/2.jpeg"
                    alt="Create Telegram Channel"
                    className="rounded-xl border shadow-md w-full max-w-[300px]"
                />
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-2">✅ {t('guide.connect_channel.step2')}</h2>
                <p className="text-gray-700 mb-4">
                    {t('Tap Add Admin → Search for @ProllioBot → Select it → Grant following permissions Then tap')}{' '}
                    {/*Tap <strong>Add Admin</strong> → Search for <code>@ProllioBot</code> → Select it →*/}
                    {/*Grant following permissions Then tap <strong>Done</strong>.*/}
                </p>
                <div className={"flex flex-col md:flex-row gap-4"}>
                <img
                       src="/img/guide/3.jpeg"
                       alt="Create Telegram Channel"
                       className="rounded-xl border shadow-md w-full max-w-[300px]"
                   />
                   <img
                       src="/img/guide/4.jpeg"
                       alt="Create Telegram Channel"
                       className="rounded-xl border shadow-md w-full max-w-[300px]"
                   />
                   <img
                       src="/img/guide/5.jpeg"
                       alt="Create Telegram Channel"
                       className="rounded-xl border shadow-md w-full max-w-[300px]"
                   />
               </div>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-2">✅ {t('guide.connect_channel.step3')}</h2>

                <p className="text-gray-700 mb-4">
                   {t('Return to the Prollio Dashboard → Go to the Channels page — if the bot was added correctly, your channel will appear there automatically.')}
                    {/*Return to the <strong>Prollio Dashboard</strong> → Go to the <strong>Channels</strong> page — if the bot was added correctly, your channel will appear there automatically.*/}
                </p>
                <img
                    src="/img/guide/img.png"
                    alt="Create Telegram Channel"
                    className="rounded-xl border shadow-md w-full"
                />
            </div>
        </div>
    )
}

export default ChannelGuide
