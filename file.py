from dataclasses import dataclass

# i fucking hate dictionaries so i will use dataclasses for the in memory approach
@dataclass
class File:
    id: int
    name: str
    description: str
    image: str