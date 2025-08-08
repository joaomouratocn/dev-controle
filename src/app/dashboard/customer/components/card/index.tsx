export function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome: </a> Arthur Henrique
      </h2>
      <p>
        <a className="font-bold">Email:</a> teste@teste.com.br
      </p>
      <p>
        <a className="font-bold">Telefone:</a> xx 99945982
      </p>
      <button className="bg-red-500 px-4 mt-2 rounded text-white self-start">
        Deletar
      </button>
    </article>
  );
}
