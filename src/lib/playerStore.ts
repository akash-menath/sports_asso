export interface Player {
    id: number;
    name: string;
    level: string;
    district: string;
    phone: string;
    email: string;
    status: string;
    clubInstitution?: string;
    registrationNo?: string;
    aadhaarNo?: string;
    achievements?: string[];
    bio?: string;
}

const STORAGE_KEY = 'players_data';

// Initial mock data to keep the UI looking the same for new users
const MOCK_PLAYERS: Player[] = [
    { id: 1, name: 'Sanjay Kumar', level: 'Senior level', district: 'Bengaluru', phone: '90984 32156', email: 'sanjay.k@gmail.com', status: 'Approved' },
    { id: 2, name: 'Rahul Dravid', level: 'Junior level', district: 'Mysuru', phone: '90984 32156', email: 'rahul.d@gmail.com', status: 'Approved' },
    { id: 3, name: 'Vikram Singh', level: 'Sub-Junior level', district: 'Hubballi', phone: '90984 32156', email: 'vikram.s@gmail.com', status: 'Pending' },
    { id: 4, name: 'Anil Kumble', level: 'Junior Level', district: 'Belagavi', phone: '90984 32156', email: 'anil.k@gmail.com', status: 'Pending' },
    { id: 5, name: 'Kiran More', level: 'Senior Level', district: 'Mangaluru', phone: '90984 32156', email: 'kiran.m@gmail.com', status: 'Approved' },
    { id: 6, name: 'Sunil Gavaskar', level: 'Senior Level', district: 'Udupi', phone: '90984 32156', email: 'sunil.g@gmail.com', status: 'Approved' },
    { id: 7, name: 'Ravi Shastri', level: 'Ponny', district: 'Dharwad', phone: '90984 32156', email: 'ravi.s@gmail.com', status: 'Pending' },
];

export const playerStore = {
    getPlayers: (): Player[] => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) {
                // Initialize with mock data if empty
                localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PLAYERS));
                return MOCK_PLAYERS;
            }

            const parsed = JSON.parse(data);

            return parsed;
        } catch (e) {
            console.error('Error loading players:', e);
            return MOCK_PLAYERS;
        }
    },

    savePlayer: (playerData: Omit<Player, 'id'>) => {
        try {
            const existing = playerStore.getPlayers();
            // Generate a simple numeric ID based on the max existing ID + 1
            const maxId = existing.reduce((max, p) => p.id && typeof p.id === 'number' && p.id > max ? p.id : max, 0);
            const newPlayer: Player = {
                ...playerData,
                id: maxId + 1,
            };
            const updated = [...existing, newPlayer];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return newPlayer;
        } catch (e) {
            console.error('Error saving player:', e);
        }
    },

    updatePlayer: (id: number | string, updates: Partial<Player>) => {
        try {
            const existing = playerStore.getPlayers();
            const updated = existing.map(p => String(p.id) === String(id) ? { ...p, ...updates } : p);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Error updating player:', e);
        }
    },

    deletePlayer: (id: number | string) => {
        try {
            const existing = playerStore.getPlayers();
            const updated = existing.filter(p => String(p.id) !== String(id));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Error deleting player:', e);
        }
    },

    getPlayerById: (id: number | string): Player | undefined => {
        const players = playerStore.getPlayers();
        return players.find(p => String(p.id) === String(id));
    }
};
