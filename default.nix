{
    #rust_overlay = import (builtins.fetchTarball "https://github.com/oxalica/rust-overlay/archive/master.tar.gz");
    pkgs ? import <nixpkgs> {},
    fetchFromGitHub ? pkgs.fetchFromGitHub,
    rustPlatform ? pkgs.rustPlatform,
}:
rustPlatform.buildRustPackage rec {
    pname = "ClaytonXYZ";
    version = "a607f43a9ce9b7e67b491dda4811ad6a536e0639";
    src = fetchFromGitHub {
        owner = "ClaytonDoesThings";
        repo = pname;
        rev = version;
        sha256 = "1p3x4Q2PTrYrlwRl3T4U1jgbfeoWHkgXCmcs2agDyFQ=";
    };
    buildInputs = with pkgs; [
    ];

    cargoLock = {
        lockFile = ./Cargo.lock;
        outputHashes = {
            "maud-0.24.0" = "sha256-czBOrReiiZqhBZbig6BPme0gflCYWWsaJjXkNL1iu6A=";
        };
    };

    meta = {
        description = "Package for claytondoesthings.xyz";
    };
}
