import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import {AuthContext} from "../context/auth.context";
import { useContext } from "react";

function Home() {
  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  return (
    <div className="Home">
      <TopNavbar />
      <h1>hello {currentUser.user.username}</h1>
      <img src={currentUser.user.avatarUrl}/>
      <p>
        Pikachu (ピカチュウ, Pikachū?) est une espèce de Pokémon, une créature
        de fiction issue de la franchise médiatique Pokémon de Nintendo. Il est
        apparu la première fois au Japon en 1996, dans les jeux vidéo Pokémon
        Vert et Pokémon Rouge, créés par Satoshi Tajiri. Initialement conçu
        comme un personnage secondaire, Pikachu est devenu la mascotte de
        l'univers Pokémon après avoir été choisi comme personnage principal dans
        l'adaptation télévisuelle du jeu, aux côtés de son dresseur Sacha. Il
        apparaît depuis de manière récurrente dans le marketing de la franchise,
        au point de désigner parfois celle-ci par métonymie. Pikachu est imaginé
        par Atsuko Nishida de Game Freak et dessiné par Ken Sugimori à partir du
        sprite des versions rouge et verte. Il est créé en même temps que son
        évolution, Raichu ; à partir de la deuxième génération, il est également
        doté d’une pré-évolution, Pichu. Pikachu est de type électrique et
        occupe le 25e emplacement dans le Pokédex national, l'encyclopédie qui
        recense les différentes espèces de Pokémon. Considérée comme une icône
        de la culture kawaii et présenté par Anne Allison, une professeure
        d'anthropologie culturelle, comme l'équivalent japonais de Mickey Mouse,
        il est devenu mondialement célèbre et réapparaît parodié dans d'autres
        séries animées comme Les Simpson ou Drawn Together. Il est le Pokémon le
        plus reconnu de la franchise. Propriété de Nintendo, la franchise
        Pokémon est apparue au Japon en 1996 avec les jeux vidéo Pocket Monsters
        Vert et Pocket Monsters Rouge. Son concept de base est la capture et
        l'entraînement de créatures appelées Pokémon, afin de leur faire
        affronter ceux d'autres dresseurs de Pokémon. Chaque Pokémon possède un
        ou deux types – tels que l'eau, le feu ou la plante – qui déterminent
        ses faiblesses et ses résistances au combat. En s'entraînant, ils
        apprennent de nouvelles attaques et peuvent évoluer en un autre
        Pokémon1. La conception de Pikachu est l’œuvre d'Atsuko Nishida et a été
        finalisée par Ken Sugimori et l’équipe de développement des personnages
        du studio Game Freak. Il est conçu avec la première génération de jeux
        Pokémon, Pokémon Rouge et Pokémon Vert, sortis à l'extérieur du Japon
        sous les titres de Pokémon Rouge et Pokémon Bleu2,3. Si Pikachu ne fait
        pas partie des premiers Pokémon créés, il constitue néanmoins le premier
        Pokémon de type électrique4 : lorsque, au cours du développement du jeu,
        la création de ce type est suggérée, Pikachu est proposé comme exemple
        d’un Pokémon de ce type4. Quant au nom japonais de Pikachu (ピカチュウ,
        Pikachū?, officiellement romanisé en Pikachu), Satoshi Tajiri a expliqué
        qu'il avait été créé à partir des onomatopées japonaises de l'étincelle
        ピカ (pika?) et du couinement de la souris チュウ (chū?), le présentant
        donc comme une souris électriqueN 2,5 ; de fait, il infirme ainsi les
        suppositions de certains sites de fans qui voyaient dans ce nom une
        référence au pika6,7. Pourtant, Atsuko Nishida, qui a participé à la
        réalisation du design originel de Pikachu, indique s'être inspirée de
        l'écureuil8. Si la quasi-totalité des Pokémon ont vu leur nom adapté
        lors de la sortie mondiale de Pokémon, Pikachu a conservé son nom
        original, simplement transcrit dans les alphabets latin (Pikachu),
        cyrillique (Пикачу) et coréen (피카츄). Pikachu est d'abord conçu comme
        un Pokémon parmi les 150 autresN 3,5. Mais dès 1996, alors que Pokémon
        Rouge et Bleu battent tous les records de vente au Japon, Nintendo
        cherche une mascotte pour incarner sa licence. Le premier produit
        dérivé, le manga Pokémon - Pocket Monsters, prend pour principal Pokémon
        du héros un Mélofée (ClefairyN 4) dont Pikachu n'est que le
        partenaire9,10. Ce dernier s'impose cependant en tant que mascotte
        lorsqu'il devient le premier Pokémon de Sacha dans la série animée ; il
        est choisi par les développeurs au vu de sa popularité chez les enfants
        des deux sexesN 3,5 et de son aspect kawaii, qui doit permettre à
        Nintendo d'atteindre un public plus jeune et féminin11. Son pelage de
        couleur jaune, une des trois couleurs primaires, lui permettait
        également d'être reconnaissable facilement par les enfants, le seul
        autre personnage de la même couleur étant Winnie l'ourson12.
      </p>
      <BottomNavbar />
    </div>
  );
}

export default Home;
