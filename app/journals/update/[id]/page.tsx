import { getJournalEntry } from "@/actions/journal-actions";
import JournalCard from "@/components/journal-components/journal-card";
import JournalUpdateForm from "@/components/journal-components/journal-update-form";
import MainLayout from "@/components/layout/main-layout";
import React from "react";

const JournalUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Await the params object first
    const { id } = await params;

    // Use the resolved `id` to fetch journal entry
    const journalEntry = await getJournalEntry(id);

    return (
        <MainLayout className="flex flex-col items-center gap-4 p-4 pt-20">
            <JournalCard cardTitle="Update Journal Entry">
                <JournalUpdateForm journalEntry={journalEntry[0]} />
            </JournalCard>
        </MainLayout>
    );
};

export default JournalUpdatePage;
