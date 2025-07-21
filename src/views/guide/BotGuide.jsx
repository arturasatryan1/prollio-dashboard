import useTranslation from "@/utils/hooks/useTranslation.js";

const BotGuide = () => {
    const {t} = useTranslation();

    return (
        <div className="">
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-2">🤖 {t('guide.create_bot.step1')}</h2>
                <p className="text-gray-700 mb-4">
                    {t('Open')} <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">@BotFather</a>{' '}
                    {t('in Telegram and tap')} <strong>/start</strong>.
                </p>
                <img
                    src="/img/guide/bot1.jpeg"
                    alt="BotFather Start"
                    className="rounded-xl border shadow-md w-full max-w-[300px]"
                />
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-2">🤖 {t('guide.create_bot.step2')}</h2>
                <p className="text-gray-700 mb-4">
                    {t('Send')} <strong>/newbot</strong> {t('and follow the instructions to set a name and username for your bot.')}{' '}
                    {t('Your bot username must end with')} <code>bot</code> (e.g., <code>MyAwesomeBot</code>).
                </p>
                <img
                    src="/img/guide/bot2.jpeg"
                    alt="Create Bot"
                    className="rounded-xl border shadow-md w-full max-w-[300px]"
                />
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-2">🤖 {t('guide.create_bot.step3')}</h2>
                <p className="text-gray-700 mb-4">
                    {t('After creating the bot, BotFather will send you a message with your bot token.')}
                    <br />
                    <strong>{t('Copy this token')}</strong> — you’ll need it to connect your bot to Prollio.
                </p>
                <img
                    src="/img/guide/bot3.jpeg"
                    alt="Bot Token"
                    className="rounded-xl border shadow-md w-full max-w-[300px]"
                />
            </div>
        </div>
    );
};

export default BotGuide;
