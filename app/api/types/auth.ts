export type SignInAPIBody =
  | {
      provider: "google";
      email: string;
      name: string;
      image: string;
    }
  | {
      provider: "credentials";
      email: string;
      password: string;
    };
