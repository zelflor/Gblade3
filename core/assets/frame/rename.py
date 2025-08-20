import os

# Récupère le dossier du script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Liste des fichiers .png
for filename in os.listdir(script_dir):
    if filename.lower().endswith(".png"):
        full_path = os.path.join(script_dir, filename)
        name_part = os.path.splitext(filename)[0]  # nom sans extension

        # Parsing du nom
        parts = [p.strip() for p in name_part.split(",")]
        props = {}

        for part in parts:
            if "=" in part:
                key, value = part.split("=", 1)
                props[key.strip().lower()] = value.strip()

        # Vérifie si les deux champs nécessaires sont présents
        if "name" in props and "color" in props:
            new_name = f"{props['name']}_{props['color']}.png"
            new_path = os.path.join(script_dir, new_name)

            print(f"\n🖼️  Fichier détecté : {filename}")
            print(f"🔁 Nouveau nom proposé : {new_name}")

            confirm = input("→ Renommer ? [o/N] ").strip().lower()
            if confirm == "N":
                print("⏩ Ignoré")
            else: 
                os.rename(full_path, new_path)
                print(f"✅ Renommé → {new_name}")
                
        else:
            print(f"⚠️  Ignoré : {filename} (name ou color manquant)")
