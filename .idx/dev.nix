# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
  ];
  # Sets environment variables in the workspace
  env = {
    NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyBGj2TGscv3kJgb0SC8ZS912ZtQ9pGIRcM";
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "sdhan-suite.firebaseapp.com";
    NEXT_PUBLIC_FIREBASE_PROJECT_ID = "sdhan-suite";
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "sdhan-suite.firebasestorage.app";
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "540744813374";
    NEXT_PUBLIC_FIREBASE_APP_ID = "1:540744813374:web:b617f1f5a7fe79381efa6f";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "dbaeumer.vscode-eslint"
      # "vscodevim.vim"
    ];
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        npm-install = "npm install";
      };
      # Runs when a workspace is imported or opened
      onStart = {
        # Example: start a background task
        # npm-dev = "npm run dev";
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = [
        {
          # The command to run to start the server
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--hostname"
            "0.0.0.0"
          ];
          # The name that shows up in the UI
          id = "web";
          # The file to open in the preview browser
          manager = "web";
        }
      ];
    };
  };
}
