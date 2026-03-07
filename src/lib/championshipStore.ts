export interface Match {
    id: number;
    team1: string;
    team2: string;
    score1?: string;
    score2?: string;
    status: 'Live' | 'Scheduled' | 'Completed';
    time?: string;
    pitch?: string;
    half?: string;
    bestPlayer?: string;
}

export interface Report {
    id: string;
    type: string;
    msg: string;
    status: 'Logged' | 'Solved';
    time: string;
}

export interface Championship {
    id: string;
    level: string;
    number: string;
    category: string;
    academicYear: string;
    title: string;
    groundName: string;
    place: string;
    district: string;
    startDate: string;
    endDate: string;
    regDeadline: string;
    time: string;
    observerDetails: {
        associationObserver: string;
        observerName: string;
        observerDistrict: string;
        contactNumber: string;
        email: string;
    };
    committees: {
        selection: {
            chairman: string;
            selector: string;
            coach: string;
            secretary: string;
            stateObserver: string;
            ksscObserver: string;
        };
    };
    status: 'Ongoing' | 'Upcoming' | 'Completed' | 'Postponed';
    dateDisplay: string;
    matches?: Match[];
    reports?: Report[];
    attendance?: {
        observerMarked: boolean;
        referees: { name: string; marked: boolean }[];
    };
    selectionList?: { name: string; team: string }[];
}

const STORAGE_KEY = 'championships_data';

export const championshipStore = {
    getChampionships: (): Championship[] => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading championships:', e);
            return [];
        }
    },

    saveChampionship: (championship: Championship) => {
        try {
            const existing = championshipStore.getChampionships();
            const updated = [...existing, championship];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Error saving championship:', e);
        }
    },

    updateChampionship: (id: string, updates: Partial<Championship>) => {
        try {
            const existing = championshipStore.getChampionships();
            const updated = existing.map(c => c.id === id ? { ...c, ...updates } : c);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Error updating championship:', e);
        }
    },

    getChampionshipById: (id: string): Championship | undefined => {
        const championships = championshipStore.getChampionships();
        return championships.find(c => c.id === id);
    }
};
