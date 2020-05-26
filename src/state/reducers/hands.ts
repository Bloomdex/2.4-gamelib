import { Card } from "../../Card"
import { Skip, PlayCard } from "../actions"

type State = Card[][]

type Action = PlayCard | Skip
