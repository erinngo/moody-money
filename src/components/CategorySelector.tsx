interface CategorySelectorProps {
  selectedCategory: string;
  onChange: (value: string) => void;
  categories: { label: string; icon: string }[];
}

export default function CategorySelector({
  selectedCategory,
  onChange,
  categories,
}: CategorySelectorProps) {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-400 mb-2">카테고리를 선택하세요</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          return (
            <button
              type="button"
              key={cat.label}
              onClick={() => onChange(cat.label)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-medium transition
                  ${
                    isSelected
                      ? "bg-purple-300 text-black border-cyan-600"
                      : "bg-purple-100 text-black  hover:border-white"
                  }
                `}
            >
              <img src={cat.icon} alt={cat.label} className="w-8 h-8 mb-1" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
