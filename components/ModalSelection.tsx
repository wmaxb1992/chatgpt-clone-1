import useSWR from "swr";
import Select from "react-select";
function ModalSelection() {
  const fetchModels = () => fetch("/api/getEngines").then((res) => res.json()); //fetching the models (backend route)

  // fetch models-->
  const { data: models, isLoading } = useSWR("models", fetchModels); //getting the data from the models-->
  const { data: model, mutate: setModal } = useSWR("model", {
    fallbackData: "text-davinci-003",
    // model is the 'key'
  }); //made the same as that of chatinput

  //   if(model, not selected --> fallbacks to text-davinci-003)-->

  return (
    <Select
      className="mt-2 "
      options={models?.modelOptions}
      defaultValue={model}
      placeholder={model}
      isSearchable
      isLoading={isLoading}
      menuPosition={"fixed"}
      classNames={{
        control: (state) => "bg-[#434654] border-[#434654]",
      }}
      onChange={(e) => setModal(e.value)}
    />
  );
}

export default ModalSelection;
