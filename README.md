# SKCT Wellness Platform

A comprehensive wellness platform designed specifically for Sri Krishna College of Technology (SKCT) students, featuring AI-powered mental health support, community forums, and wellness tracking tools.

## 🌟 Features

### 🤖 Cookie AI Chatbot
- **Powered by Google Gemini AI**
- Instant coping mechanisms and mental health support
- Personalized wellness recommendations
- Direct connection to counselors
- 24/7 availability for student support

### 💬 Community Forum
- Reddit-style discussion threads
- Upvoting and downvoting system
- Nested comment threads
- Anonymous posting options
- Counselor-moderated discussions
- Mental health topic categories

### 🧘 Wellness Hub
- **AI-Powered Meditation**: Personalized meditation programs with Cookie AI
- **Smart Journaling**: Guided journaling with AI insights and mood tracking
- **Meditation Tracker**: Calendar view, streak tracking, and achievement system
- **Quick Wellness Guides**: Essential techniques for SKCT students
- **Resource Library**: Articles, audio content, and wellness materials

### 📊 Additional Features
- Wellness assessments (PHQ-9, GAD-7)
- Counselor appointment booking
- Student/counselor/volunteer dashboards
- Responsive design for mobile and desktop
- Dark/light theme support

## 🛠️ Technology Stack

- **Frontend**: Next.js 14.2.16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with Lucide React icons
- **AI Integration**: Google Gemini AI API
- **State Management**: React Hooks (useState)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Google Gemini AI API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/[your-username]/skct-wellness-platform.git
cd skct-wellness-platform
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. Set up environment variables:
Create a \`.env.local\` file in the root directory:
\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
app/
├── api/chat/           # Gemini AI chatbot API
├── chatbot/           # Cookie AI interface
├── forum/             # Community forum system
├── wellness-hub/      # Main wellness features
│   ├── ai-meditation/
│   ├── ai-journaling/
│   ├── guides/
│   ├── meditation-tracker/
│   ├── articles/
│   └── audio/
├── wellness-tests/    # Mental health assessments
├── appointments/      # Counselor booking
├── counselors/        # Counselor directory
└── dashboard/         # Role-based dashboards

components/
├── ui/               # Reusable UI components
└── sidebar.tsx       # Navigation sidebar

lib/
└── utils.ts          # Utility functions
\`\`\`

## 🤖 Cookie AI Features

Cookie is the platform's AI assistant, powered by Google Gemini, designed to:

- Provide instant mental health support and coping strategies
- Offer personalized meditation and mindfulness recommendations
- Guide students through journaling exercises with intelligent prompts
- Recognize crisis situations and connect students with counselors
- Maintain conversation context for personalized interactions

## 🏫 SKCT-Specific Features

- Tailored content for college students
- Integration with SKCT counseling services
- Campus-specific wellness resources
- Student community building tools
- Academic stress management techniques

## 🔐 Privacy & Security

- Anonymous posting options in forums
- Secure API communication
- No personal data storage without consent
- GDPR-compliant data handling
- Encrypted AI conversations

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers (primary interface)
- Tablets (optimized layouts)
- Mobile phones (touch-friendly navigation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Contact SKCT Counseling Services
- Use the in-app Cookie AI chatbot
- Post in the community forum
- Email: [your-support-email]

## 🙏 Acknowledgments

- Sri Krishna College of Technology for supporting student mental health
- Google Gemini AI for powering our chatbot
- The open-source community for the amazing tools and libraries

---

**Made with ❤️ for SKCT Students' Mental Health and Wellness**
