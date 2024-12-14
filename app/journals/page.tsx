import { getJournalEntries } from "@/actions/journal-actions";
import JournalCard from "@/components/journal-components/journal-card";
import JournalCreateForm from "@/components/journal-components/journal-create-form";
import JournalEntries from "@/components/journal-components/journal-entries";
import MainLayout from "@/components/layout/main-layout";

const JournalPage = async () => {
    const journalEntries = await getJournalEntries();

    return (
        <MainLayout className="flex flex-col items-center justify-center gap-4 p-4 pt-20">
            <JournalCard cardTitle="Create Journal Entry">
                <JournalCreateForm />
            </JournalCard>

            <JournalEntries journalEntries={journalEntries} />
        </MainLayout>
    );
};

export default JournalPage;
