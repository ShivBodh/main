
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const peethamQuiz: QuizQuestion[] = [
  {
    question: 'Which Peetham, established by Adi Shankaracharya, is located in the southern part of India?',
    options: ['Dwaraka Peetham', 'Sringeri Sharada Peetham', 'Govardhana Peetham', 'Jyotirmath Peetham'],
    correctAnswer: 'Sringeri Sharada Peetham',
    explanation: 'Sringeri Sharada Peetham is the southern Āmnāya Pīṭham, located in Sringeri, Karnataka, on the banks of the Tunga river.',
  },
  {
    question: 'The Mahāvākya "Prajñānam Brahma" (Consciousness is Brahman) is associated with which Veda and Peetham?',
    options: ['Yajur Veda - Sringeri', 'Sama Veda - Dwaraka', 'Rig Veda - Puri', 'Atharva Veda - Jyotirmath'],
    correctAnswer: 'Rig Veda - Puri',
    explanation: 'The Govardhana Peetham in Puri is the custodian of the Rig Veda, and its associated Mahāvākya is "Prajñānam Brahma".',
  },
  {
    question: 'Which Peetham is located in the Himalayas near the sacred shrine of Badrinath?',
    options: ['Sringeri Sharada Peetham', 'Dwaraka Peetham', 'Govardhana Peetham', 'Jyotirmath Peetham'],
    correctAnswer: 'Jyotirmath Peetham',
    explanation: 'Jyotirmath Peetham, the northern seat, is located in the Chamoli district of Uttarakhand, in the Himalayas.',
  },
  {
    question: 'The western Peetham, located in Gujarat and associated with the Sama Veda, is known as:',
    options: ['Sringeri Sharada Peetham', 'Dwaraka Sharada Peetham', 'Govardhana Peetham', 'Jyotirmath Peetham'],
    correctAnswer: 'Dwaraka Sharada Peetham',
    explanation: 'The Dwaraka Sharada Peetham, also known as the Kalika Matha, is the western cardinal peetham located in the sacred city of Dwaraka, Gujarat.',
  },
    {
    question: 'Which Mahāvākya means "I am Brahman"?',
    options: ['Prajñānam Brahma', 'Tat Tvam Asi', 'Ayam Ātmā Brahma', 'Aham Brahmāsmi'],
    correctAnswer: 'Aham Brahmāsmi',
    explanation: '"Aham Brahmāsmi" is the Mahāvākya associated with the Sringeri Sharada Peetham and the Yajur Veda.',
  },
];
