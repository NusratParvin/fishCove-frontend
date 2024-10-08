# FishCove Frontend

**FishCove** is a platform offering tips and stories on fish care. The frontend is built with a focus on user experience, featuring a dynamic news feed, article creation, and premium content access.

[Live Demo](https://fishcove-client.vercel.app/)

## Features

- **User Authentication**: Login and register with JWT-based authentication.
- **Profile Management**: Users can update profiles and view their posts, followers, and following.
- **Fish Care Articles**: Users can browse and read fish care tips and stories.
- **Premium Content**: Users can access premium content after making secure payments.
- **Article Creation & Editing**: Users can create, edit, and delete articles categorized as "Tip" or "Story."
- **Upvote & Comment**: Users can upvote articles and comment on them.
- **Payment Integration**: Stripe is integrated for secure payments to access premium content.

## Technology Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Payment**: Stripe

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NusratParvin/fishCove-frontend
   cd fishcove-frontend
   ```

## Installation

### Install Dependencies

````bash
npm install


## Add Environment Variables

Create a `.env.local` file and add:

```bash
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key



npm run dev
The application will run at http://localhost:3000.

## Key Pages

* **Home Page**: Displays a news feed of articles.
* **Login/Register**: User authentication forms.
* **Profile Page**: View and edit user information.
* **Article Page**: Detailed view of individual articles.
* **Payment Page**: Process payments for premium content.

## Deployment

* **Deploy to Vercel**: Connect the repository to Vercel, add environment variables, and deploy.
````
