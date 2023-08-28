{
    #rust_overlay = import (builtins.fetchTarball "https://github.com/oxalica/rust-overlay/archive/master.tar.gz");
    pkgs ? import <nixpkgs> {},
    fetchFromGitHub ? pkgs.fetchFromGitHub,
    rustPlatform ? pkgs.rustPlatform,
}:
rustPlatform.buildRustPackage rec {
    pname = "ClaytonXYZ";
    version = "ae2672119bd81fa1d85a36136504b0480cc52017";
    src = fetchFromGitHub {
        owner = "ClaytonDoesThings";
        repo = pname;
        rev = version;
        sha256 = "sha256-LfvgUkMoxT6BjBg+t54faiw28417hvOoePjP+0qL4LQ=";
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
