
# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.zulu
  ];
  # Sets environment variables in the workspace
  env = {
    NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyBGj2TGscv3kJgb0SC8ZS912ZtQ9pGIRcM";
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "sdhan-suite.firebaseapp.com";
    NEXT_PUBLIC_FIREBASE_PROJECT_ID = "sdhan-suite";
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "sdhan-suite.firebasestorage.app";
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "540744813374";
    NEXT_PUBLIC_FIREBASE_APP_ID = "1:540744813374:web:b617f1f5a7fe79381efa6f";
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "G-F89VPW7ZMF";
  };
  # This adds a file watcher to startup the firebase emulators. The emulators will only start if
  # a firebase.json file is written into the user's directory
  services.firebase.emulators = {
    detect = true;
    projectId = "sdhan-suite";
    services = ["auth" "firestore"];
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          # Change directory to workspace before running the dev server
          command = ["bash" "-c" "cd workspace && npm run dev -- --port $PORT --hostname 0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
