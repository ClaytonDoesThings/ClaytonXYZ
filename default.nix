{
    #rust_overlay = import (builtins.fetchTarball "https://github.com/oxalica/rust-overlay/archive/master.tar.gz");
    pkgs ? import <nixpkgs> {},
    fetchFromGitHub ? pkgs.fetchFromGitHub,
    rustPlatform ? pkgs.rustPlatform,
}:
rustPlatform.buildRustPackage rec {
    pname = "ClaytonXYZ";
    version = "3f17e5cdad0c4a6e9f7a99f17e04c57a69ed035c";
    src = fetchFromGitHub {
        owner = "ClaytonDoesThings";
        repo = pname;
        rev = version;
        sha256 = "sha256-YwTk3i4z6TcwHy5IbbPN2bUOGcldrGRslYHRo3PiqUY=";
    };

    cargoLock = {
        lockFile = ./Cargo.lock;
        outputHashes = {
            "maud-0.24.0" = "sha256-czBOrReiiZqhBZbig6BPme0gflCYWWsaJjXkNL1iu6A=";
        };
    };

    doCheck = false;

    preFixup = ''
        mv ./s $out/s
    '';

    meta = {
        description = "Package for claytondoesthings.xyz";
    };
}
