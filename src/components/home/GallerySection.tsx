import Dog from './gallery/dog.jpg';
import Duck from './gallery/duck.jpg';
import Doll from './gallery/doll.jpg';
import Bear from './gallery/bear.jpg';

export default function GallerySection() {
  const galleryItems = [
    {
      image: Dog,
      prompt: 'Cute baby elephant with a flower crown',
    },
    {
      image: 'https://img.freepik.com/premium-photo/cartoonish-duck-wear-crocheted-dress-ai-generated_616879-5026.jpg',
      prompt: 'Kawaii strawberry with a happy face',
    },
    {
      image: 'https://i.pinimg.com/736x/dd/bf/81/ddbf817e024bc6772933a0fda2f59ca3.jpg',
      prompt: 'Small sleeping fox amigurumi',
    },
    {
      image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2f9b2bab-6a8c-431a-bf93-fecd72975408_500x541.png',
      prompt: 'Floppy-eared bunny with bow tie',
    },
    {
      image: 'https://i1.wp.com/eliserosecrochet.com/wp-content/uploads/2024/05/ami-whale-chat-gpt.webp?ssl=1',
      prompt: 'Rainbow unicorn with sparkly horn',
    },
    {
      image: 'https://preview.redd.it/ai-crochet-strikes-again-again-repost-from-r-crochet-v0-0qkd39owt1ec1.jpg?width=960&format=pjpg&auto=webp&s=f1c296c0b08365677c3f40b5ae94f7007f5e8bab',
      prompt: 'Rainbow unicorn with sparkly horn',
    },
    {
      image: Bear,
      prompt: 'Rainbow unicorn with sparkly horn',
    },
    {
      image: Doll,
      prompt: 'Rainbow unicorn with sparkly horn',
    },
    {
      image: Duck,
      prompt: 'Rainbow unicorn with sparkly horn',
    },
    {
      image: 'https://i0.wp.com/foxcreations.com.au/wp-content/uploads/2024/03/IMG_1780.jpg?resize=1080%2C1082&ssl=1',
      prompt: 'Rainbow unicorn with sparkly horn',
    },
    {
      image: 'https://woolpattern.com/wp-content/uploads/2024/02/Tiny-Fox-Amigurumi-Pattern-Free.jpg',
      prompt: 'Rainbow unicorn with sparkly horn',
    },
  ];

  return (
    <section className="py-6 bg-black relative overflow-hidden">
      {/* Top fade overlay */}
      <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>
      
      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>

      <div className="max-w mx-auto px-4 relative">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryItems.map((item, index) => (
            <div key={index} className="mb-4">
              <img
                src={item.image}
                alt={item.prompt}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}