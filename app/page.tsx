import DropZone from "@/components/dropzone";

export default function Home() {
  return (
    <main className="space-y-6 pb-8">
      <div className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-medium text-center">
          Free Unlimited Media Converter
        </h2>
        <p className="text-gray-400 text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52">
          Meet Convio, your one-stop solution for multimedia conversion.
          Simplify your content creation by converting images, audio, or videos
          into any format, free and unlimited. Unleash your creativity and
          redefine your digital experience with Convio today!
        </p>
      </div>

      <DropZone/>
    </main>
  );
}
